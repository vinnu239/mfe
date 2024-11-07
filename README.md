bootstrap.js --> which contains actual amount of application code
index.js ||Main.js --> which import that bootstrap file the maim purpose it gives opportunity to webpack before execution of bootstrap.js it goes and fetch application code from different projects
for the image check the photo in mobile captured on 23-nov(2023)
**why we need cloud front**
cloud fronrt which is responsible to expose the distribution files to outside world.
In simple terms the build file which we stored in the S3 bucket 
**What is the use of invalidation in cloudfront?**

Cloudfront wont take the latest index.html if we done any updates
so in order to update the latest index .html we will create the invalidation inside cloudfront
we can create it in 2 ways
either directly go to AWS  cloudfront and create invalidation
or for automatic way add the below run commad inside .yaml file

create AWS_DISTRIBUTION_ID ,AWS_SECRET_ACCESS_KEY,AWS_ACCESS_KEY_ID inside git setting and create keys under secrets and variables tab
run: aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "/container/latest/index.html"        

   env:  

AWS_S3_ENDPOINT: https://s3.amazonaws.com        

AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}                 AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}           AWS_DEFAULT_REGION: "ap-south-1"

**Deploy Process?**

we want to create .yml file in .github/workflows which github will run for us.Those commands will help to run if we push any changes.
For detail commands got through the mfe code

**What is the reason for incorrect alignment between prod and normal application?**

In normal application each repo / application contain individual css
but in prod we will run all the application at once because of that here we are using same css library. So, Normally css files will append the name what we use in normal css file. But in Production the js library will generate the random name instead of custom name like below
className='jss1', className ='jss2' and so on causingissue

for eg: we have container and landing application if we deploy those container  will generate css as jss1 while intial loading phase in the same way we landing application will also generate the css as jss1 (assume landing and contianer are showing in single page). So the latest css will overwrite the other 1.overcome this use spectific append name by using below library.
library --> createGenerateClassName  along with stylesProvider
const createGenerateClassName = createGenerateClassName({

ProductionPrefix : 'ma',

})

**What is browser history and memory history?**

Both are different types of handling routing history for react-route dom
Browser history: normally copy the domain path and pass to the router
eg: domain/marketing/price --> marketing/pricing  Broswer history will capture and sent to router the router will see that url and publish that component
Memory histroy: It will take the current user window path i,e is your are in pricing page it note down the pricing path in the memory
Why we are using memory history for internal comp?

eg is we have container marketing and auth comp
if container is using  reactBrowser history along with auth will use Vue Browser history(names are same but the implemetation might be differ)
so if any user interactions happen in container and auth app than 2 browser history will try to mix and it will become huge mistake for tha application loading.
so to overcome that we are using Memory Routing for internal appliactions
