class Container {
  private containerMap = new Map();
  // 注册实例
  public set(id: string | symbol, value: any) {
    this.containerMap.set(id, value);
  }

  public get<T>(id: string | symbol): T {
    return this.containerMap.get(id);
  }

  public has(id:string | symbol):boolean{
    return this.containerMap.has(id);
  }
}

const containerInstance = new Container();
export default containerInstance;
