import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./pages/test/test.module').then((m) => m.TestModule);
    },
  },
  {
    path: 'json-schema',
    loadChildren: () =>
      import('./pages/json-schema/json-schema.module').then(
        (m) => m.JsonSchemaModule
      ),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./pages/test/test.module').then((m) => m.TestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
