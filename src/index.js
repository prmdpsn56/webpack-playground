import Heading from './components/heading/heading';
import HelloWorldButton from './components/hello-world-button/hello-world-button';
import output from './output.js';


const helloWorldButton = new HelloWorldButton();
const heading = new Heading();
let i = 10;

helloWorldButton.render();
heading.render();

console.log(process.env.NODE_ENV);
console.log(output);