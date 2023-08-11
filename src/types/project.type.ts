type contentImage = {
    title: string,
    text: string,
    image: string
}

type projectType  = {
    about: string
    start: string
    end:string | null
    content: contentImage[]
    group: string[]
}