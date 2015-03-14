
save_default_options('-mat');


% Scalar primitive tests
clear
a = 3.5;
complex = 2 + 3j;
flag = true;
int = 5;
myChar = 'x';

save scalar_primitives.mat a complex flag int myChar

% Row Vector primitive tests
clear
a = 0:.5:3;
complex = (1:.5:2) + (2:.5:3)*j;
flag = [true, true, false, true, true];
int = [-1 0 1 2];
myChar = 'xyz';

save row_primitives.mat a complex flag int myChar

% Column vector primitive tests
a = transpose(a);
complex = transpose(complex);
flag = transpose(flag);
int = transpose(int);
myChar = transpose(myChar);

save column_primitives.mat a complex flag int myChar

% Primitive 2D matrix tests
clear
a = [1 1.5 2; 2 2.5 3];
complex = [1 1.5 2; 2 2.5 3] + j*[2 2.5 3; 3 3.5 4];
flag = [false false true; false true false; true false false];
int = [1 2; 3 4; 5 6];
myChar = ['abc'; 'def'; 'ghi'];

save 2d_primitives.mat a complex flag int myChar

% Primitive 3D matrix tests
a(:,:,1) = a;
a(:,:,2) = 2*a(:,:,1);
complex(:,:,1) = complex;
complex(:,:,2) = 2*complex(:,:,1);
flag(:,:,1) = flag;
flag(:,:,2) = false(3,3);
int(:,:,1) = int;
int(:,:,2) = 2*int(:,:,1);
myChar(:,:,1) = myChar;
myChar(:,:,2) = char(myChar(:,:,1) + 1);

save 3d_primitives.mat a complex flag int myChar

% Structure structure tests
clear
s.string = 'stringVal';
s.array = 0:1:3;
s.struct = struct('f1', 'string2', 'f2', 0:.5:1);
s.complex = 1 + 2*j;
s.flagArray = [true false];

save scalar_struct.mat s

% Row vector structure tests
clear
s(1,1).string = 'stringVal';
s(1,1).array = 0:1:3;
s(1,1).struct = struct('f1', 'string2', 'f2', 0:.5:1);
s(1,1).complex = 1 + 2*j;
s(1,1).flagArray = [true false];

s(1,2).string = 'stringVal2';
s(1,2).array = 1:1:4;
s(1,2).struct = struct('f1', 's2', 'f2', 1:.5:2);
s(1,2).complex = 2 + 3*j;
s(1,2).flagArray = [false false];

save row_struct.mat s

% Column vector structure test
s = transpose(s);

save column_struct.mat s

% 2d matrix structure test
d1.string = 'd1';
d1.array = [0];
d1.struct = struct('g1', 'd1', 'g2', [1 2]);
d1.complex = [2 3] + 3*j;
d1.flagArray = true;

d2.string = 0; % intentionally not a string
d2.array = 'd2';
d2.struct = struct('h1', 'd2', 'h2', 'fieldVal');
d2.complex = j;
d2.flagArray = false;

s = [s [d1; d2]];

save 2d_struct.mat s

% Sparse matrix test
clear
sp_scalar = sparse(1, 1, 5);
sp_row = sparse(1, [3 5], [4.3 6.2]);
sp_column = sparse([3 5], 1, [4.3 6.2]);
sp_matrix = sparse([2 3 5], [1 1 4], [1.5 4 8]);

save sparse.mat sp_scalar sp_row sp_column sp_matrix

% Cell matrix tests
clear
cell_scalar = {1};
cell_row = {1, [5 6 7]};
cell_column = transpose(cell_row);
cell_matrix = { 1, [5.5 6 7]; 'string', struct() };

save cell.mat cell_scalar cell_row cell_column cell_matrix

% Class tests
clear
obj = ss(1); % state space object.  Requires 'control' package from Octave Forge

save object.mat obj

% Empty tests
clear
num = [];
string = '';
structMain = struct('f1', 'a', 'f2', 3);
struct = structMain([]);
structNoFields = struct([]);
logMain = true;
logical = logMain([]);
cell = {};

save empty.mat num logical string struct structNoFields cell
