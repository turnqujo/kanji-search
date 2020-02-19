import Component from "../component";

class KnExample extends Component {
  constructor() {
    super({
      tag: 'kn-example',
      template: `<h1>Hello, Custom Components!</h1>`
    })

    this.setAttribute('id', 'example-ele')
    console.log(this.attributes)
  }
}

export default KnExample
