	
# This repo is mainly for hireeasy app deploy on the heroku cloud.
# HireEasy Cloud url:  https://hireeasycloudserver.herokuapp.com/
# A few tips about the deployment app on cloud

* *Read this paper to get some basic knowledge * 
[Difference Between Development, Stage, And Production] (https://dev.to/flippedcoding/difference-between-development-stage-and-production-d0p)

* *dependencies vs devDependencies* The difference between these two, is that devDependencies are modules which are only required during development, while dependencies are modules which are also required at runtime. So beofore you deploy your app on cloud, you should move devDependencies into dependencies in package.json.

		

