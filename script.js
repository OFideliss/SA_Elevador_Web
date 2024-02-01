document.addEventListener('DOMContentLoaded', function () {
    const elevators = document.querySelectorAll('.elevator');
    const callButtons = document.querySelectorAll('.call-button');

    elevators.forEach((elevator, index) => {
        // Defina o térreo como o andar inicial
        elevator.dataset.currentFloor = "0";
        moveElevator(elevator, 0, 0);
    });

    callButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const targetFloor = parseInt(button.dataset.targetFloor);
            const elevator = findNearestElevator(targetFloor);
            moveElevator(elevator, parseInt(elevator.dataset.currentFloor), targetFloor);
        });
    });

    function findNearestElevator(targetFloor) {
        const elevatorsArray = Array.from(elevators);
        return elevatorsArray.reduce((closest, elevator) => {
            const currentFloor = parseInt(elevator.dataset.currentFloor);
            const closestDistance = Math.abs(currentFloor - targetFloor);
            const elevatorDistance = Math.abs(parseInt(closest.dataset.currentFloor) - targetFloor);
            return closestDistance < elevatorDistance ? elevator : closest;
        });
    }

    function moveElevator(elevator, currentFloor, targetFloor) {
        const targetPosition = calculateFloorPosition(targetFloor);
        elevator.style.bottom = targetPosition + 'px';
        elevator.dataset.currentFloor = targetFloor;
    }

    function calculateFloorPosition(floor) {
        const floorHeight = 60;
        const groundFloorPosition = 190;

        return groundFloorPosition + floorHeight * (floor - 1);
    }
});
