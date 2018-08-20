/*
 *   {\__/}
 *   ( •-•)
 *   /つ 各种排序
 */

 /*
 * 选择排序
 * 它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完
 * 选择排序是不稳定的排序方法（比如序列[5， 5， 3]第一次就将第一个[5]与[3]交换，导致第一个5挪动到第二个5后面）
 */
function choiceSort (arr) {
    for (var i = 0, len = arr.length; i < len - 1; i++) {
        for(j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
/*
* 冒泡排序
* 一次比较两个相邻的元素，如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们交换过来。
*/
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i ++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                var key = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = key;
            }
        }
    }
    return arr;
}

/*
* 插入排序
* 有一个已经有序的数据序列，要求在这个已经排好的数据序列中插入一个数，但要求插入后此数据序列仍然有序
*/
function insertionSort(arr) {
    for(var i = 1, len = arr.length; i < len; i++) {
        var key = arr[i];
        for(j = i-1; j >= 0; j--) {
            if (arr[j] > key) {
               arr[j + 1] = arr[j];
               arr[j] = key;
               key = arr[j]
            }
        }
    }
    return arr;
}

/*
* 合并两个数组并排序
* 
*/
function sortMergeArr(arr1, arr2) {
    arr1.sort(function(x,y) {return x - y});
    arr2.sort(function(x,y) {return x - y});
    var i = 0;
    var j = 0;
    var arr = []
    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            arr.push(arr1[i++]);
        }else {
            arr.push(arr2[j++])
        }
    }
    while(i < arr1.length) {
        arr.push(arr1[i++]);
    }
    while(j < arr2.length) {
        arr.push(arr2[j++]);
    }
    return arr;
}