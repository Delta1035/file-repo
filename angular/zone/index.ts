// @ts-ignore
import('zone.js');
let rootZone = Zone.current;
let zoneA = rootZone.fork({
    name: 'zoneA'
});

zoneA.run(function () {
    newFunction();
});



function newFunction () {
    setTimeout(() => {
    });
}

