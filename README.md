	
# This repo is mainly for hireeasy app deploy on the heroku cloud.
* HireEasy Cloud url:  https://hireeasycloudserver.herokuapp.com/
* MongoDb (free version): https://www.mongodb.com/cloud/atlas
* A few tips about the deployment app on cloud

* Read this paper to get some basic knowledge:
[Difference Between Development, Stage, And Production](https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p)

* **dependencies vs devDependencies** The difference between these two, is that devDependencies are modules which are only required during development, while dependencies are modules which are also required at runtime. So beofore you deploy your app on cloud, you should move devDependencies into dependencies in package.json.
* Due to security concern, we can not push our api key or database connect strings on github which is heroku deploy pipline start, so we need to **set config env** on heroku instead of hardcode those sensitive keys.
* Always read the **log** when we deploy our app on cloud. It's very helpful to show us the issues or problems when we deploy our app to heroku.
* A very close and straight example quite similar to our case, which show us 
  [How to Deploy React Express, Node App to Heroku - 2020](https://youtu.be/xgvLP3f2Y7k)


		

