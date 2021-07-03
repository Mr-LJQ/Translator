interface ObjectConstructor {
  keys<T extends object, K extends Extract<keyof T,string>>(o: T): K[]
  value<T extends object, K extends Extract<keyof T,string>>(o: T): T[K][]
  entries<T extends object, K extends Extract<keyof T,string>>(o: T): [K, T[K]][]
}

type ExtendHTMLAttributes<P, T extends React.HtmlHTMLAttributes<HTMLElement>> = P & React.DetailedHTMLProps<
  T,
  T extends React.HtmlHTMLAttributes<infer K> ? K : HTMLElement
>


