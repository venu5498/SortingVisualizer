const arrayContainer = document.getElementById("array-container");
const arraySizeInput = document.getElementById("array-size");
const arrayNumbersInput = document.getElementById("array-numbers");

    const generateArray = () => {
        arrayContainer.innerHTML = "";
        let numbers;
        if (arrayNumbersInput.value) {
            numbers = arrayNumbersInput.value.split(",").map(num => parseInt(num.trim()));
        } else {
            const size = arraySizeInput.value || 20;
            numbers = Array.from({ length: size }, () => ~~(Math.random() * 80) + 20);
        }
        
        const maxValue = Math.max(...numbers);
        
        numbers.forEach(num => {
            const arrayBar = document.createElement("div");
            arrayBar.classList.add("array-bar");
            arrayBar.style.height = `${(num / maxValue) * 90}%`;
            arrayBar.style.position = "relative"; // Ensures number moves with the bar
            
            const valueLabel = document.createElement("div");
            valueLabel.classList.add("bar-value");
            valueLabel.innerText = num;
            valueLabel.style.position = "absolute";
            valueLabel.style.bottom = "100%"; // Moves number above the bar
            valueLabel.style.left = "50%";
            valueLabel.style.transform = "translateX(-50%)";
            valueLabel.style.fontWeight = "bolder";
            
            arrayBar.appendChild(valueLabel);
            arrayContainer.appendChild(arrayBar);
        });
    };

    const bubbleSort = async () => {
        generateCode("bubble");
        document.getElementById("flaming-text").innerText="Bubble Sort";
        const bars = document.querySelectorAll(".array-bar");
        for (let i = 0; i < bars.length - 1; i++) {
            for (let j = 0; j < bars.length - i - 1; j++) {
                bars[j].style.backgroundColor = "#ff6f61";
                bars[j + 1].style.backgroundColor = "#ff6f61";
                
                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    await swap(bars[j], bars[j + 1]);
                }
                
                bars[j].style.backgroundColor = "green";
                bars[j + 1].style.backgroundColor = "white";
            }
            bars[bars.length - 1 - i].style.backgroundColor = "#6b6b6b";
        }
    };

    const swap = (bar1, bar2) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Swap heights
                const tempHeight = bar1.style.height;
                bar1.style.height = bar2.style.height;
                bar2.style.height = tempHeight;
                
                // Swap values
                const tempText = bar1.firstChild.innerText;
                bar1.firstChild.innerText = bar2.firstChild.innerText;
                bar2.firstChild.innerText = tempText;

                resolve();
            }, 2000);
        });
    };

    //Selection sort
    const selectionSort = async () => {
        generateCode("selection");
        document.getElementById("flaming-text").innerText="Selection Sort";
        const bars = document.querySelectorAll(".array-bar");
        const n = bars.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            bars[i].style.backgroundColor = "#ff6f61";
            for (let j = i + 1; j < n; j++) {
                bars[j].style.backgroundColor = "#ff6f61";
                if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                    minIndex = j;
                }
                bars[j].style.backgroundColor = "white";
            }
    
            if (minIndex !== i) {
                bars[i].style.backgroundColor = "#ff6f61";
                bars[minIndex].style.backgroundColor = "#ff6f61";
                await swap(bars[i], bars[minIndex]);
                bars[i].style.backgroundColor = "green";
                bars[minIndex].style.backgroundColor = "white";
            } else {
                bars[i].style.backgroundColor = "green";
            }
        }
        bars[bars.length - 1].style.backgroundColor = "green";
    };
    

    //Merge Sort
    const mergeSort = async () => {
        generateCode("merge");
        document.getElementById("flaming-text").innerText="Merge Sort";
        const bars = document.querySelectorAll(".array-bar");
        const numbers = Array.from(bars).map(bar => parseInt(bar.style.height));
        await mergeSortHelper(numbers, 0, numbers.length - 1, bars);
    };
    const mergeSortHelper = async (arr, left, right, bars) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await mergeSortHelper(arr, left, mid, bars);
            await mergeSortHelper(arr, mid + 1, right, bars);
            await merge(arr, left, mid, right, bars);
        }
    };
    
    const merge = async (arr, left, mid, right, bars) => {
        let i = left, j = mid + 1, k = 0;
        const temp = [];
        while (i <= mid && j <= right) {
            bars[i].style.backgroundColor = "#ff6f61";
            bars[j].style.backgroundColor = "#ff6f61";
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) {
            temp[k++] = arr[i++];
        }
        while (j <= right) {
            temp[k++] = arr[j++];
        }
        k = 0;
        for (let i = left; i <= right; i++) {
            arr[i] = temp[k++];
            bars[i].style.height =`${(arr[i]/Math.max(...arr))*95}%`
            bars[i].firstChild.innerText = arr[i];
            bars[i].style.backgroundColor = "green";
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    //Insertion Sort
    const insertionSort = async () => {
        generateCode("insertion");
        document.getElementById("flaming-text").innerText="Insertion Sort";
        const bars = document.querySelectorAll(".array-bar");
        const n = bars.length;
        for (let i = 1; i < n; i++) {
            let j = i;
            bars[i].style.backgroundColor = "#ff6f61";
            while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
                bars[j].style.backgroundColor = "#ff6f61";
                bars[j - 1].style.backgroundColor = "#ff6f61";
                await swap(bars[j], bars[j - 1]);
                bars[j - 1].style.backgroundColor = "green";
                j--;
            }
            bars[j].style.backgroundColor = "green";
        }
    };

    //Quick sort
    const quickSort = async (low = 0, high = document.querySelectorAll(".array-bar").length - 1) => {
        generateCode("quick");
        document.getElementById("flaming-text").innerText="Quick Sort";
        const bars = document.querySelectorAll(".array-bar");
        if (low < high) {
            let pivotIndex = await partition(bars, low, high);
            bars[pivotIndex].style.backgroundColor = "green"; // Reset pivot color after partition
            await quickSort(low, pivotIndex - 1);
            await quickSort(pivotIndex + 1, high);
        }
    };
    
    const partition = async (bars, low, high) => {
        let pivot = parseInt(bars[high].style.height);
        bars[high].style.backgroundColor = "#ffcc00"; // Different color for pivot
        let i = low - 1;
    
        for (let j = low; j < high; j++) {
            bars[j].style.backgroundColor = "#ff6f61";
            if (parseInt(bars[j].style.height) < pivot) {
                i++;
                await swap(bars[i], bars[j]);
                bars[i].style.backgroundColor = "green";
            } else {
                bars[j].style.backgroundColor = "green";
            }
        }
        await swap(bars[i + 1], bars[high]);
        bars[i + 1].style.backgroundColor = "green";
        return i + 1;
    };
    

    function generateCode(sortingName) {
        if (sortingName === 'selection') {
            const code = `
    <pre>
    <h2 style="text-align:center;">Selection Sort Code</h2>
    public static void selectionSort(int[] arr) {
        int n = arr.length;
    
        // Outer loop: goes through each element
        for (int i = 0; i < n - 1; i++) {
            // Assume the current element is the smallest
            int minIndex = i;
    
            // Inner loop: find the smallest element in the unsorted portion
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j; // Update the index of the minimum element
                }
            }
    
            // Swap the found minimum element with the element at index i
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
    </pre>
            `;
            document.getElementById("code").innerHTML = code;
        }

        if (sortingName === 'quick') {
            const code = `
    <pre>
    <h2 style="text-align:center;">Quick Sort Code</h2>
    public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    </pre>
            `;
            document.getElementById("code").innerHTML = code;
        }

        if (sortingName === 'merge') {
            const code = `
    <pre>
    <h2 style="text-align:center;">Merge Sort Code</h2>
    public class MergeSort {
    public static void mergeSort(int[] arr) {
        if (arr.length < 2) return;

        int mid = arr.length / 2;
        int[] left = new int[mid];
        int[] right = new int[arr.length - mid];

        System.arraycopy(arr, 0, left, 0, mid);
        System.arraycopy(arr, mid, right, 0, arr.length - mid);

        mergeSort(left);
        mergeSort(right);
        merge(arr, left, right);
    }

    private static void merge(int[] arr, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }

        while (i < left.length) {
            arr[k++] = left[i++];
        }

        while (j < right.length) {
            arr[k++] = right[j++];
        }
    }
    </pre>
            `;
            document.getElementById("code").innerHTML = code;
        }


        if (sortingName === 'insertion') {
            const code = `
    <pre>
    <h2 style="text-align:center;">Insertion Sort Code</h2>
    public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements of arr[0..i-1], that are greater than key,
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    </pre>
            `;
            document.getElementById("code").innerHTML = code;
        }

        if (sortingName === 'bubble') {
            const code = `
    <pre>
    <h2 style="text-align:center;">Bubble Sort Code</h2>
    public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    </pre>
            `;
            document.getElementById("code").innerHTML = code;
        }
    }
    


    
    generateArray();