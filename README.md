# supportExplore
web API支持度探测工具
## 需求
需求分析

目前的需求如下：

1.可以检验JS支持度，考虑到类似service worker，响应流这些API不能单纯的检验是否存在某个API，而要通过其他方法验证可用性。因此这里最好设计为插件的形式，将“检验是否存在”这个动作抛给用户处理

2.可以检验CSS支持度，支持按数组为单位检验某个属性的一组值是否都被支持

3.支持检验HTML的属性是否合法，可以配置到某个HTML的某个属性是否合法，可以检测某个HTML元素是否合法

4.可以添加额外参数，比如检验service worker这个过程中，可以添加缓存是否命中这样的参数

5.可以调整上报时机，让用户自己选择何时上报。这样一方面是处于用户可能的性能优化考虑，另一方面是在一个跟其他页面或线程通信时，上报时机可能无法被预期到

6.提供生命周期钩子，允许在探测过程中或探测结束后动态修改一些值，比如结束后设置过滤器修改上报的值

<img width="723" alt="image" src="https://github.com/SalengNotLittleMeng/apiSupportDetection/assets/76039018/0cd31dd8-ef60-429f-945a-5a31903b3c4e">

## 使用

引入SDK后，执行new ApiSupport({}),在参数填写配置，即可探测对应api的支持度并上报

目前支持：

HTML属性的探测

JS方法的探测

CSS属性支持度的探测

理论上探测方法用适配器进行了抽象，可以进行node等环境等扩展

由于鉴定一个API是否可用，在一些场景下是非常复杂的，因此整个探测过程使用全插件化的形式，如果未使用插件，则会对根据指定的探测类型（html，css，JS）使用默认插件进行探测，具体参考配置如下：

## 配置

api:object｜array

api中可以配置一个或多个需要探测等API，这些信息会被按照指定方法收集后探测并上报
<img width="952" alt="image" src="https://github.com/SalengNotLittleMeng/apiSupportDetection/assets/76039018/c8b73ed2-3ed8-497e-b636-7e331c1283db">
plugins:object | array

plugins用于对SDK能力进行扩展，如果某个API不能仅依靠检测是否存在来确定是否可用，或者希望在检测时进行更多的扩展操作，可以用插件的形式对对应对API进行扩展
<img width="1006" alt="image" src="https://github.com/SalengNotLittleMeng/apiSupportDetection/assets/76039018/d082215a-5816-47d5-b88a-a7eb43521511">
插件有一些扩展方法，可以在插件的test函数中通过this访问到，比如可以在插件的this中调用setExtraData，来添加额外的上报参数

fliter:function

过滤器，区别于插件级别的过滤器，这个过滤器是在上报前对所有会上报的数据做最后处理的机会，可以访问到所有将要上报的资源。这个函数的参数data是将要上报的资源，返回值是修改后最终上报的资源

request:function

上报的请求函数，默认使用raport上报，如果需要自定义上报函数可以在这里配置

limit：number

限流，按照全部用户的百分比上报，默认全量，可以支配0-1之间的小数

immediate：boolean

是否立即探测，默认项目启动后立即开始，如果需要自己定义开始时机，可以将这个值设为false，在需要开始时调用实例的run方法
## 错误码

<img width="759" alt="image" src="https://github.com/SalengNotLittleMeng/apiSupportDetection/assets/76039018/fd227c16-3ec6-42e4-94b0-81aaccf4806a">


