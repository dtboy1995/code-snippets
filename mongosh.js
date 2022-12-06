const { CliServiceProvider } = require('@mongosh/service-provider-server');
const { WorkerRuntime } = require('@mongosh/node-runtime-worker-thread')

async function test() {
    //const serviceProvider = await CliServiceProvider.connect('mongodb://localhost')
    //console.log(serviceProvider);

    // Create a new instance of the runtime and evaluate code from a playground.
    //const runtime = new WorkerRuntime(serviceProvider);
    const runtime = new WorkerRuntime('mongodb://localhost', {}, {})
    await runtime.waitForRuntimeToBeReady()
    // console.log(runtime)
    runtime.setEvaluationListener({
        onPrint(value) {
            console.log('onPrint', value);
        }
    })
    await runtime.evaluate('use abc');
    let x = await runtime.evaluate(`print("Hello"); console.log(1,2,3); 42`)
    console.log(x.printable.documents);
    //let a = await runtime.evaluate(`db.tests.insertOne({fuck: 'you'})`)
    //console.log(a)
    await runtime.terminate()
}

test()
