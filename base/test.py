# Python program for implementation of Bubble Sort
 
def bubbleSort(arr):
    swaps = 0
    n = len(arr)
 
    # Traverse through all array elements
    for i in range(n-1):
    # range(n) also work but outer loop will
    # repeat one time more than needed.
 
        # Last i elements are already in place
        for j in range(0, n-i-1):
 
            # traverse the array from 0 to n-i-1
            # Swap if the element found is greater
            # than the next element
            if arr[j] <= arr[j + 1] :
                swaps += 1
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    print(swaps)
 
# Driver code to test above
# arr = [0,5,8,1,3,6,4,2]
arr = [2,4,6,3,1,8,5,0]
 
bubbleSort(arr)
 
print ("Sorted array is:")
for i in range(len(arr)):
    print ("%d" % arr[i],end=" ")