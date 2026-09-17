// welp this didn't work
// browsers run in incognito mode so no localstorage, cookies etc 
// between reloads
export const PersistentState = {
    test: () => {
        const localState: string | null = localStorage.getItem("myState")
        const updatedState: number = localState ? parseInt(localState) + 1 : 1;
        localStorage.setItem("myState", updatedState.toString());
        console.log("MyState is " + updatedState.toString());
        /* fetch("https://www.villekoivuranta.fi/?pysakkiProdInt=" + updatedState); */
    },
    init: () => {
        // remove test items
    }
}