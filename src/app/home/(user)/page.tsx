import { getSession } from "./_lib/actions/get-session"

export default async function Home() {
    const data = await getSession();

    return (
        <div>
            {data?.user.name}
        </div>
    )
}