import {compile, factory} from "../../compiler"


document.querySelector<HTMLDivElement>('#app')!.innerHTML = compile(
  factory("a", {}, "test")
)

