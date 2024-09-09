import Button from "./Button";

export default function App() {
    return (
        <div>
            <Button color='danger'  OnClick={() => console.log('clicked')}>My Button</Button>
        </div>
    )
}