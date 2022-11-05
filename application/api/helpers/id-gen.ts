// https://stackoverflow.com/a/56478076 for now, figure out something better
export function genID() {
    return Date.now() + ((Math.random()*100000).toFixed())
}