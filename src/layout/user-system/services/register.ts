import requestToServer from "src/services/requestToServer";

export async function register({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        const rs  = await requestToServer.post('/auth/signup', {
            displayName: email,
            email,
            password,
        });
        return rs;
    } catch {
        throw new Error('Register failed');
    }
    

}