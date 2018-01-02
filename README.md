# NgPreset

> Preset library to help make your Angular components customizable

[![Travis CI](https://img.shields.io/travis/gund/ng-preset/master.svg?maxAge=2592000)](https://travis-ci.org/gund/ng-preset)
[![Coverage](https://img.shields.io/codecov/c/github/gund/ng-preset.svg?maxAge=2592000)](https://codecov.io/gh/gund/ng-preset)
<!-- [![Code Climate](https://img.shields.io/codeclimate/github/gund/ng-preset.svg?maxAge=2592000)](https://codeclimate.com/github/gund/ng-preset) -->
[![Npm](https://img.shields.io/npm/v/ng-preset.svg?maxAge=2592000)](https://badge.fury.io/js/ng-preset)
[![Npm Downloads](https://img.shields.io/npm/dt/ng-preset.svg?maxAge=2592000)](https://www.npmjs.com/package/ng-preset)
[![Licence](https://img.shields.io/npm/l/ng-preset.svg?maxAge=2592000)](https://github.com/gund/ng-preset/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Ever wanted to build your component highly customizable but wondered how?

Seek no more with the `Preset` approach!

It allows you to expose essential parts of your components as templates
and let others create custom presets for it - extendig your component
without ever touching it.

You can create default preset only and ship it with your component
but those who consume can choose to use other preset or even create their own.

While creating new preset you can choose to just override one template
while keeping other template default.

Also you can combine multiple presets and they will all apply
the last one taking precedence.

## Install

If you are component developer:

```bash
$ npm install --save-dev ng-preset
```

Or if you are component consumer:

```bash
$ npm install --save ng-preset
```

## Developing component with preset

### Define a preset interface

First decide which parts of your component you want to make extendable
via presets (suppose it's header, content and footer).

Once decided - create an interface that will represent this
requirement as a preset:

```ts
// my-preset.ts
export interface MyPreset {
  headerTpl: TemplateRef<any>;
  contentTpl: TemplateRef<any>;
  footerTpl: TemplateRef<any>;
}
```

_NOTE_: that each property you define should be of type `TemplateRef`,
because that is what will be stamped inside of your component.

You can also optionally provide some context information
that a template will receive once instantiated as a generic argument
but here we will just set them to `any`.

### Get preset in component

Now in your component you can get preset component:

```ts
// my.component.ts
import { MyPreset } from './my-preset';

@Component({...})
export class MyComponent {
  presetComp = this.presetService.getPreset<MyPreset>();
  constructor(public presetService: PresetService) { }
}
```

_NOTE_: You can annotate your preset type here by setting generic argument
while calling `PresetService.getPreset`.

### Stamp preset templates in your component

Once you get preset component you can now render it in your template:

```ts
// my.component.html
<header>
  <ng-container [ngTemplateOutlet]="presetComp.headerTpl"></ng-container>
</header>
<article>
  <ng-container [ngTemplateOutlet]="presetComp.contentTpl"></ng-container>
</article>
<footer>
  <ng-container [ngTemplateOutlet]="presetComp.footerTpl"></ng-container>
</footer>
```

That's all you need for the component!

Now you also probably want to provide some default preset for it,
so go ahead and create new component.

### Default preset component

Create new component that will just implement interface you defined in
[Define a preset interface](#define-a-preset-interface) section

```ts
// my-preset-default.component.ts
import { MyPreset } from '../my-preset';

@Component({
  ...
  template: `
    <ng-template #headerTpl>Header default preset</ng-template>
    <ng-template #contentTpl>Content default preset</ng-template>
    <ng-template #footerTpl>Footer default preset</ng-template>
  `
})
export class MyPresetDefaultComponent implements MyPreset {
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
  @ViewChild('contentTpl') contentTpl: TemplateRef<any>;
  @ViewChild('footerTpl') footerTpl: TemplateRef<any>;
}
```

That is all you need to have in your preset component!

Now it's time to glue them together in the module.

### Create just component module

Create a module with just your component on it's own:

```ts
// my-component.module.ts
import { MyComponent } from './my.component';

@NgModule({
  ...
  declarations: [MyComponent],
  exports: [MyComponent],
})
export class MyComponentModule { }
```

Do not forget to export your component here.

With this module we can then create 2 more modules that will allow presets.

### Module with default preset

This module is the default module and should contain default preset in it
already setup and ready to roll:

```ts
// my.module.ts
import { PresetDefaultModule } from 'ng-preset';

import { MyComponent } from './my.component';
import { MyComponentModule } from './my-component.module';
import { MyPresetDefaultComponent } from './my-preset-default.component';

@NgModule({
  ...
  imports: [
    MyComponentModule,
    PresetDefaultModule.forComponent(MyComponent, MyPresetDefaultComponent),
  ],
  exports: [MyComponentModule],
  declarations: [MyPresetDefaultComponent],
})
```

_NOTE_: that we have to declare preset component here and also pass it
to the imported `PresetDefaultModule.withPreset` module.

But what if the user have another preset for your component?

### Custom module

Create another module that will allow user to pass it's own preset component.

```ts
// my-custom.module.ts
import { PresetModule, providePresetFor } from 'ng-preset';

import { MyPreset } from './my-preset';
import { MyComponent } from './my.component';
import { MyComponentModule } from './my-component.module';

@NgModule({
  ...
  imports: [
    MyComponentModule,
    PresetModule.forComponent(MyComponent),
  ],
  exports: [MyComponentModule],
})
export class MyCustomModule {
  static withPreset(presetType: Type<MyPreset>): ModuleWithProviders {
    return providePresetFor(MyCustomModule, presetType);
  }
}
```

_NOTE_: here it is important to pass generic argument because then users will be
checked and warned by Typescript compiler that the preset does not match.

We are having 2 separate modules because if user provides it's own preset -
we do not want him to pay the cost of carrying unused default presert.  
It will be simply eliminated at the build time from the bundle.

## Consuming component with preset

### Default module

Most users will consume component with default preset
in which case nothing special will be needed, just import the module:

```ts
// app.module.ts
import { MyModule } from '@me/my-module'; // Some library

@NgModule({
  ...
  imports: [MyModule]
})
export class AppModule { }
```

### Custom module

And when you have some preset that you want to use with component
just import custom version of module:

```ts
// app.module.ts
import { MyCustomModule } from '@me/my-module'; // Some library
import { MyPresetComponent } from '@me/my-preset'; // Some preset library

@NgModule({
  ...
  imports: [
    MyCustomModule.withPreset(MyPresetComponent)
  ]
})
```

That's it!

The component will be customized from now on!

## Demo App server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` and `dist` filder will be generated.

## Running unit tests

Run `npm test` to execute the unit tests via `Jest`.

## Licence

MIT © [Alex Malkevich](malkevich.alex@gmail.com)
