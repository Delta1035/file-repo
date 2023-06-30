
class DirectiveDemoComponent {
  constructor(config) {
    this.title = 'ng_demo';
    this.age = 0;
    this.fromApp = 1;
    this.unless = false;
    this.person = {
      name: 'app name',
      age: 12
    };
    this.config = config;
  }
  addPersonAge() {
    this.person.age++;
  }
  toggle() {
    this.unless = !this.unless;
  }
  ngAfterViewInit() {
    console.log('push', this.push);
    // @ts-ignore
    // console.log(this.push.decorators[0].args[0].template);
    const r = Reflect.getPrototypeOf(this.push).constructor.decorators[0].args[0].template;
    console.log(r);
  }
  ngOnInit() {
    setInterval(() => {
      this.age++;
      this.changeAD();
    }, 2500);
  }
  add() {
    this.age++;
  }
  changeAD() {
    this.container = this.adHost.viewContainerRef;
    this.container.clear();
    const instance = this.container.createComponent(src_app_shared_components_ad_item_ad_item_component__WEBPACK_IMPORTED_MODULE_0__.AdItemComponent).instance;
    instance.index = this.age;
    // 可以加载不同的组件
  }
}