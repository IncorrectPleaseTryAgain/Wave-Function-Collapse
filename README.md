# Wave-Function-Collapse Mark-2
Fundamental Wave Function Collapse Algorithm

![image](https://github.com/IncorrectPleaseTryAgain/Wave-Function-Collapse-Simple/assets/99939034/635bf79d-7f98-48a1-bb20-56f8e121c7c9)
# <a href="https://youtu.be/FL11g2pa-QE">Preview Video</a>
----

## TILES
![image](https://github.com/IncorrectPleaseTryAgain/Wave-Function-Collapse/assets/99939034/2f3796a8-08bb-4918-8a8f-30aeb99647ca)

## SOCKETS
![image](https://github.com/IncorrectPleaseTryAgain/Wave-Function-Collapse/assets/99939034/48e31cc9-6435-414e-a35a-cadfd4327585)

----

## Description

This projects is an implementation for the basic strucure of the [Wave Function Collapse Algorithm](https://github.com/mxgmn/WaveFunctionCollapse). Some key elements of the algorithm has not been implemented into this itteration of the project. [3]

These elements include:
- [x] Matching the cell socket with every other tile socket in every rotation/configuration.
- [ ] Recurselvely propogating the entropy for each cell.
- [ ] Given a sample image, determining the neccesary tiles and their respected sockets.

----

## Structure
This implementation of this algorithm is fairly simple and quite intuative.

1. Create a list of all the tiles and note their sockets for N-E-S-W
2. Create a grid of cells.
3. Each cell keeps track if it is collapsed as well as a list containing all the possible tiles that it could become.
4. Get a copy of the grid that contains all the cells that have not been collapsed.
5. From that copy, get the cell with the least amount of entropy (less possible tiles it could become = less entropy).
6. Collapse that cell and choose one of its options to become its tile type.
7. Update that cells neighbors entropy.
8. Reapeat until all cells have been collapsed.

----

## References
[1] The Coding Train. (2022). Coding Challenge 171: Wave Function Collapse [YouTube Video](https://www.youtube.com/watch?v=rI_y2GAlQFM&t=2023s).
<br>
[2] Wave Function Collapse Explained. (2020, April 13). [BorisTheBrave.com](https://www.boristhebrave.com/2020/04/13/wave-function-collapse-explained/).
<br>
[3] mxgmn. (2022, July 26). mxgmn/WaveFunctionCollapse: Bitmap & tilemap generation from a single example with the help of ideas from quantum mechanics. [GitHub](https://github.com/mxgmn/WaveFunctionCollapse).

‌

‌

‌
