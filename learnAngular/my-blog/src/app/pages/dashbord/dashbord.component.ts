import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
export type Menu = {
  level: 1 | 2 | 3;
  url: string;
  title: string;
  icon: string;
  open: boolean;
  selected: boolean;
  disabled: boolean;
  children?: Menu[];
};
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {
  isCollapsed = false;
  menus: Menu[] = [
    {
      level: 1,
      /**
       * ./ 基于当前路径匹配路由
       * /从头开始匹配路由
       */
      url: './article',
      icon: 'file-text',
      title: '文章',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          url: './article/edit',
          icon: 'edit',
          title: '编辑',
          open: true,
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          url: './article/draft',
          icon: 'snippets',
          title: '草稿箱',
          open: true,
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          url: './article/preview',
          icon: 'read',
          title: '预览',
          open: true,
          selected: false,
          disabled: false,
        },
      ],
    },
    {
      level: 1,
      url: './category',
      icon: 'compress',
      title: '分类',
      open: true,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      url: './tags',
      icon: 'tags',
      title: '标签',
      open: true,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      url: './comments',
      icon: 'comment',
      title: '评论',
      open: true,
      selected: false,
      disabled: false,
    },
    {
      level: 1,
      url: './welcome',
      icon: 'home',
      title: '主页',
      open: true,
      selected: false,
      disabled: false,
    },
  ];
  constructor(private contexts: ChildrenOutletContexts) {}
  ngOnInit(): void {
    return;
  }

  getRouteAnimationData() {
    // console.log(this.contexts);
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ]; // 路由模块data => animation 这是我们自定义的属性
  }
}
