# TFlagPicker

TFlagPicker is a simple package to implement countries dial codes.


## Install
for npm: 
```shell
npm i tflagpicker
``` 

## Setup
For setting up, simply import and use in your components:
```js
import TFlagPicker from 'TFlagPicker';

function App() {
  return (
    <div className="App">
            <TFlagPicker defaultCountry={"TR"}/>
    </div>
  );
}
export default App;
```
## Props


| Property | Description  | Data type  |
| searchPlaceholder | Set text of placeholder in modal search input | String |
| defaultCountry | Symbol of default selected country | String |
| modalDirection | ltr of rtl (default: ltr) | String |

## Events
**onChange**: 
called when selected country changes. returns new selected country object.
simple usage:
```js
<TFlagPicker
                defaultCountry={"TR"}
                searchPlaceholder={"Search ..."}
                modalDirection={"ltr"}
                onChange={(country)=>console.log(country)}
            />
```

