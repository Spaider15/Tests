/**
 * Created by ia.busarov on 06.06.2017.
 */
export async function queryToAPI(query: string, variables: {[index: string]: any} = { genres : [[]] }) {
    const res = await fetch("https://api.droptv.org/graphql", {
        body: JSON.stringify({
            query,
            variables,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (res.status !== 200) {
        throw new Error("API failure, invalid status: " + res.status + ", " + res.statusText +
            (await res.text()));
    }
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors.map((e: any) => e.message).join());
    }

    return json.data;
}