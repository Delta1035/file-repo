// <Reference path = "SomeNameSpace.ts"/>

type getKeyValue<T> = {
    [key in keyof T]:T[key]
}

type className = getKeyValue<SomeNameSpace.SomeInterfaceName>;