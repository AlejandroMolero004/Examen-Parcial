import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
type data_ninja={
    name:string
    capital:string
}
export const handler:Handlers={
    GET:async(_req:Request,ctx:FreshContext<unknown,data_ninja>)=>{
        const country=ctx.params.el_pais
        const key=Deno.env.get("API_KEY")
        if(!key){
            return ctx.render()
        }
        const url_ninja=`https://api.api-ninjas.com/v1/country?name=${country}`
        const response=await fetch(url_ninja,
        {
            headers: {
            'X-Api-Key': key
            },
        },
        )
        const respuesta:data_ninja[]=await response.json()
        
        return ctx.render(respuesta[0])
            
        }
}

const Page=(props:PageProps<data_ninja>)=>{
    
    return (
        <div>
            <p>{props.data.name}</p>
            <a href={`/city/${props.data.capital}`}>
            <p>{props.data.capital}</p>
            </a>
           
        </div>
            
    )
}

export default Page