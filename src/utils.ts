export function toExternalScriptTag(url: string) {
  return `<script src='${url}'></script>`
}

export const toInlineScriptTag = (jsCode: string) => {
  return `<script>${jsCode}</script>`
}

export const toExternalStylesheetTag = (url: string) => {
  return `<link href='${url}' rel='stylesheet'>`
}

export const toTags = (customCode: string | string[] | undefined, toScript: (url: string) => string) => {
  if (!customCode) {
    return ""
  }

  if (typeof customCode === "string") {
    return toScript(customCode)
  } else {
    return customCode.map(toScript).join("\n")
  }
}

export const jsStringifyOptions = (options: object) => {
  const functionPlaceholder = "____FUNCTION_PLACEHOLDER____"
  const fns = []
  let json = JSON.stringify(
    options,
    (key, value) => {
      if (typeof value === "function") {
        fns.push(value)
        return functionPlaceholder
      }
      return value
    },
    2
  )

  json = json.replace(new RegExp('"' + functionPlaceholder + '"', "g"), () => fns.shift())

  return json
}

export const removeTrailingSlash = (str: string) => {
  return str.endsWith("/") ? str.slice(0, -1) : str
}
