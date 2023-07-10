export type userTypeConectionError = {
    message: string
    status: number
}

export type userTypeIsOK = {
    data: {
        _id: string
        avatarImage?: string
        email: string
        name:string
        status?: 'Active' | 'Pending'
    }
}

export type userType = userTypeIsOK | userTypeConectionError