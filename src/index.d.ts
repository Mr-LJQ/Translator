interface ObjectConstructor {
  keys<T extends object, K extends keyof T>(o: T): K[]
  value<T extends object, K extends keyof T>(o: T): T[K][]
  entries<T extends object, K extends keyof T>(o: T): [K, T[K]][]
}

type ExtendHTMLAttributes<P, T extends React.HtmlHTMLAttributes<HTMLElement>> = P & React.DetailedHTMLProps<
  T,
  T extends React.HtmlHTMLAttributes<infer K> ? K : HTMLElement
>