const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/'

/**
 * 为站内路径添加 base 前缀（GitHub Pages 项目页部署在子路径下）。
 * 外部链接和已是完整 URL 的路径原样返回。
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path
  if (path === '/') return BASE
  return BASE + path.replace(/^\//, '')
}

/** 去掉末尾斜杠，用于路径比较 */
export function normalizePath(path: string): string {
  return path.replace(/\/+$/, '')
}
