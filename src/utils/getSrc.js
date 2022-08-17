const getSrc = (name) => {
    const path = `/src/assets/${name}`
 
    const modules =
        import.meta.globEager('/src/assets/*')
    return modules[path].default
}
export default getSrc;