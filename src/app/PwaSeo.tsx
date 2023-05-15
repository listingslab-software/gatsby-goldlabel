import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import {
  WrapperShape,
} from "../types"
import {
  makeImgSrc,
  useGQLMeta,
  useGQLGatsbyPages,
} from "../"
import {
  Container,
  Grid,
  List,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material"


export default function PwaSeo(props: WrapperShape) {
  const gatsbyPages = useGQLGatsbyPages()
  // console.log("gatsbyPages", gatsbyPages)
  // let locale: string = "en"
  let title: string = "Default title"
  let description: string = "Default description"
  let keywords: string = "default, keywords"
  let og: string | null = null
  let twitter: string | null = null
  const {
    pageContext,
  } = props
  const meta = useGQLMeta()
  const {
    siteTitle,
    siteDescription,
    siteKeywords,
    siteImage,
    siteTwitter,
  } = meta

  title = siteTitle
  description = siteDescription
  keywords = siteKeywords
  og = siteImage
  twitter = siteTwitter
  
  const {special, instructions, book} = pageContext.data
  let appData: any = null
  
  if(pageContext){
    const {data} = pageContext    
    appData = data
  }

  if(special === "404"){
    title = instructions
  }

  if(special === "home"){
    title = `${siteTitle}`
    description = siteDescription
    keywords = siteKeywords
  }

  if(special === "book"){
    if (book){
      // console.log("book", book)
      title = book.title
      description = book.description
      keywords = book.description
      const {bookimage} = book
      if (bookimage){
        og = makeImgSrc(bookimage.url)
      }
    }
  }

  return (<>
            <GatsbySeo 
              title={title}
              description={description}
            />
            <Container maxWidth="lg">

              <Grid container>
                
                <Grid item xs={12} md={3}>
                  <List dense>
                    { gatsbyPages.map((item: any, i: number) => {
                      let linkTitle = siteTitle
                      const {path, pageContext} = item.node
                      const {data} = pageContext
                      if (!data) return null
                      const { book } = data
                      if (book) linkTitle = book.title
                      return <ListItemButton 
                              key={`page_${i}`}
                              onClick={(e: React.MouseEvent) => {
                                e.preventDefault()
                                window.open(path, "_self")
                              }}>
                                <ListItemText 
                                  primary={linkTitle}
                                  // secondary={path}
                                />
                            </ListItemButton>
                    })}
                  </List>
                </Grid>

                <Grid item xs={12} md={9}>
                  <Typography component={"span"}>
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                    {og ? <img src={og} width={300} /> : null }
                    <p>{keywords}</p>
                  </Typography>
                </Grid>
                
              </Grid>

              
             
            </Container>

          </>)
}

/*

ALSO USE gatsby built in HEAD API for keywords

<pre>meta {JSON.stringify(meta, null, 2)}</pre>
*/