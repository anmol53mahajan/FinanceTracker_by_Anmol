function setNestedError(errors, path, error) {
  const pathParts = path.split('.')
  let cursor = errors

  pathParts.forEach((part, index) => {
    if (index === pathParts.length - 1) {
      cursor[part] = error
      return
    }

    cursor[part] = cursor[part] || {}
    cursor = cursor[part]
  })
}

export function yupResolver(schema) {
  return async (values) => {
    try {
      const validatedValues = await schema.validate(values, { abortEarly: false })
      return { values: validatedValues, errors: {} }
    } catch (error) {
      const errors = {}

      if (error?.inner?.length) {
        error.inner.forEach((item) => {
          if (!item.path || errors[item.path]) {
            return
          }

          setNestedError(errors, item.path, {
            type: item.type || 'validation',
            message: item.message,
          })
        })
      } else if (error?.path) {
        setNestedError(errors, error.path, {
          type: error.type || 'validation',
          message: error.message,
        })
      }

      return { values: {}, errors }
    }
  }
}