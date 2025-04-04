import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
type data_ninja={
  phone:string
  is_valid:boolean
  country:string
}

export const handler:Handlers={
  GET:async(req:Request,ctx:FreshContext<unknown,data_ninja>)=>{
    const url=new URL(req.url)
    const phone=url.searchParams.get("phone")||""
    const key=Deno.env.get("API_KEY")
    if(!key){
      return ctx.render()
    }
    const url_ninja=`https://api.api-ninjas.com/v1/validatephone?number=${phone}`
    const response=await fetch(url_ninja,
      {
        headers: {
          'X-Api-Key': key
        },
      },
    )
    const respuesta:data_ninja=await response.json()
    return ctx.render(respuesta)
  }
}

export default function Home(props:PageProps<data_ninja>) {
  return (
  
        <>
        <form method="GET">
          <input type="text" name="phone" />
          <button type="submit">enviar</button>
        </form>
        {props.data.is_valid?<>
            <a href={`/country/${props.data.country}`}>
            <p>Country:{props.data.country}</p>
            </a>
            </>:<></>}
        </>
          

        

          
    
  );
}
