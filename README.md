### What is done
1) Created custom HOC that supports HMR
2) Added ability to compare the rendering of elements using hook and HOC
3) Added ability to compare the rendering of elements using custom HOC (based on hook) and default HOC
4) Added ability to compare rendering with and without theme
### Results
In all cases, 1000 elements were rendered and profiling was carried out through the dev-tools (*Profiler* tab of React Dev Tools).
1) Rendering by hook:

![Rendering by hooks](https://capella.pics/05731a0b-0c6f-4d24-9eb1-6ed67295dda9.jpg)

2) Rendering by default HOC:

![Rendering by default HOC](https://capella.pics/56fe8c5d-5fa0-4278-92ba-2b06f18c1931.jpg)

3) Rendering by custom HOC:
  
![Rendering by custom HOC](https://capella.pics/f756c959-e1cc-4615-943a-4c055de229a5.jpg)
### Local testing:
1) `yarn install`
2) `yarn start`
  
On `localhost:3000` you could toggling states.