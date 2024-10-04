export default function BooleanVariables() {
    // Declaring variables
    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let true1 = true;
    let false1 = false;
    let false2 = true1 && false1;
    let true2 = true1 || false1;
    let true3 = !false2;
    let true4 = numberVariable === 123; // always use === not ==
    let true5 = floatingPointNumber !== 321.432;
    let false3 = numberVariable < 100;

    // Returning JSX for rendering
    return (
        <div id="wd-boolean-variables">
            <h4>Boolean Variables</h4>
            true1 = {true1.toString()} <br />
            false1 = {false1.toString()} <br />
            false2 = {false2.toString()} <br />
            true2 = {true2.toString()} <br />
            true3 = {true3.toString()} <br />
            true4 = {true4.toString()} <br />
            true5 = {true5.toString()} <br />
            false3 = {false3.toString()} <br />
            <hr />
        </div>
    );
}
