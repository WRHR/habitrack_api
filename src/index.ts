import 'reflect-metadata'
import express from 'express'
import {} from 'apollo-server-express'
import {} from 'type-graphql'
import {} from 'typeorm'


const main = () => {
  const app = express()


  let PORT = process.env.PORT || 5000
  app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
  })
}

main()