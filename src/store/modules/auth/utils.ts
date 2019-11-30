export const createSession = () => {
  const nav = window.navigator
  const screen = window.screen

  return `${nav.mimeTypes.length}${nav.userAgent.replace(/\D+/g, '')}${nav.plugins.length}${screen.height || ''}${screen.width || ''}${screen.pixelDepth || ''}`
}
