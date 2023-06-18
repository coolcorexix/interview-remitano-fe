import requestToServer from "src/services/requestToServer"

export async function login({
    email,
    password
}: {
    email: string,
    password: string
}) {
    return new Promise((resolve, reject) => {
        requestToServer.post('/auth/signin', {
            email,
            password
        })
            .then(res => {
                resolve(res);
            }
            )
            .catch(err => {
                console.log('here')
                reject(err);
            }
            )


    })


}