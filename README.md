# Vue-Graduation-Project-Process-Management

毕业设计管理系统的前端代码，第一次尝试，多多练习

### Development Tools

- Element-plus
- Tailwind CSS
- VueUse
- axios

<hr/>

### question

1.  概率出现路由不跳转？？
2.  前后端role值转换

### update

<br/>
2025.7.24
<br/>
<br/>

1. 完成修改密码功能
2. 更新个人详细信息功能

<br/>
2025.7.23
<br/>
<br/>

1. 新增教师端的个人信息界面
2. user数据持久化存储在会话中

<br/>
2025.7.18
<br/>
<br/>

> admin 结束

1. 重写导入教师文件功能
2. 完善登录逻辑，会话存储增加前端role值
3. 修改路由：根据前端role值配置全局守卫
4. 退出登录功能

<br/>
2025.7.17
<br/>
<br/>

1. 封装message组件
2. 专业管理的添加，删除，搜索功能请求改为axios
3. 专业添加store缓存中

> 熟悉store缓存

<br/>
2025.7.10
<br/>
<br/>

1. useAxios改用为axios
2. axios封装（useGet,usePost,useDelete,usePut,usePatch）
3. loginService -> 登录成功且路径跳转但页面没变化？

<br/>
2025.7.4
<br/>
<br/>

增加导入教师文件功能：用XLSX将导入的excel文件解析为json后传给后端。

<br/>
2025.7.1
<br/>
<br/>
 
 > 学习前端上传文件并解析的知识

1.  完成删除专业功能
2.  完成添加专业功能

感觉目前admin只需要专业管理，admin对教师方面只有导入功能，可以在专业管理里面实现。

<br/>
2025.6.30
<br/>
<br/>

> 该页面还有新增专业，删除专业，导入教师三个功能按钮待完成

1.  管理员的专业管理页面样式全部完善。
2.  动态获取数据库中的专业列表。
3.  可以根据专业名称模糊匹配搜索。

<br/>
2025.6.29
<br/>
<br/>
 
> 对什么时候用store不太清晰

1.  引入axios，并配合vueuse完成部分全局配置，前后端成功连接。
2.  完成登录功能，但并没有在登录页面做判断是否有token的情形。
3.  将用户自己的信息存储在userstore中。

> 收获：
>
> - 了解axios，vueuse中的useAxios和createGlobalState的知识。
> - 对token，req，resp，storage等概念更清晰

<br/>
2025.6.27
<br/>
<br/>

1.  学习element-plus，添加了登录页面。
2.  引入Tailwind CSS，我觉得挺好用的。
3.  学习了一些axios方面的知识，计划用VueUse和axios混合完成该项目
