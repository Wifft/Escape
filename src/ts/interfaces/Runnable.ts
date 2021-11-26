export default interface Runnable {
    run() : void
    tick(time : number) : void
}