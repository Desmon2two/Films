type GreetingProps = {
    name: String
}

export default function Greeting({name}: GreetingProps){
    return <h1>Hello, {name}</h1>
}