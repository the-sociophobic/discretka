#include <iostream>
#include <vector>
#include <string>
#include <algorithm>


using namespace std;
const unsigned int len = 16;
typedef unsigned int uint;


int main(void)
{
	const int bul_f[len] = {0,0,0,0,0,1,0,1,1,0,0,1,1,1,1,1};
	int bul_f1[len];
	int Zhegalkin[len];
	int count = 0;
	for (int x = 0; x <= 1; x++)
		for (int y = 0; y <= 1; y++)
			for (int z = 0; z <= 1; z++)
				for (int w = 0; w <= 1; w++) {
					if (x) {
						if (y)
							bul_f1[count] = 1;
						else {
							if (z) {
								if (w)
									bul_f1[count] = 1;
								else
									bul_f1[count] = 0;
							} else {
								if (w)
									bul_f1[count] = 0;
								else
									bul_f1[count] = 1;
							}
						}
					} else {
						if (y) {
							if (w)
								bul_f1[count] = 1;
							else
								bul_f1[count] = 0;
						} else
							bul_f1[count] = 0;
					}
					count++;
				}
	count = 0;
	int SDNF[len];
	int SKNF[len];
	
	for(int x=0;x<=1;x++)
		for(int y=0;y<=1;y++)
			for(int z=0;z<=1;z++)
				for (int w = 0; w <= 1; w++) {
					if (bul_f[count]) {
						SDNF[count] = x * 1000 + y * 100 + z * 10 + w;
						SKNF[count] = 0;
					} else {
						SDNF[count] = 0;
						SKNF[count] = bool(x-1) * 1000 + bool(y-1) * 100 + bool(z-1) * 10 + bool(w-1);
					}
					count++;
				}
	
	int xin=0, yin=0, zin=0, win=0;
	char dop;
	bool flag = true;
	char ch{};
	cout << "By default x=y=z=w=0 \n";
	while (flag) {
		cout << "Choose action \n";
		cout << "[0] - Show bul vector \n";
		cout << "[1] - Compare results from BDD and SDNF counted with your x,y,z,w \n";
		cout << "[2] - Output SDNF \n";
		cout << "[3] - Output SKNF \n";
		cout << "[4] - Output Zhegalkin's polynomial \n";
		cout << "[5] - Change values of x,y,z,w \n";
		cout << "Or enter 'q' to end program \n";
		cin >> ch;
		cin.clear();
		cin.ignore(65535, '\n');
		switch (ch) {
		case '0':
			for (int i = 0; i < len; i++)
				cout << bul_f[i] << " ";
			cout << "\n";
			break;
		case '1':
			int bybdd, bysdnf, bytable;
			if (xin) {
				if (yin)
					bybdd = 1;
				else {
					if (zin) {
						if (win)
							bybdd = 1;
						else
							bybdd = 0;
					} else {
						if (win)
							bybdd = 0;
						else
							bybdd = 1;
					}
				}
			}
			else {
				if (yin) {
					if (win)
						bybdd = 1;
					else
						bybdd = 0;
				} else
					bybdd = 0;
			}
			if (SDNF[xin * 8 + yin * 4 + zin * 2 + win] != 0)
				bysdnf = 1;
			else
				bysdnf = 0;
			if (bybdd == bysdnf && bybdd == bul_f[xin * 8 + yin * 4 + zin * 2 + win])
				cout << "they all are same and equals - " << bybdd << "\n";
			else
				cout << "smth wrong with program \n";
			break;
		case '2':
			for (int i = 0; i < len; i++) {
				int x = SDNF[i] / 1000, y = SDNF[i] % 1000 / 100, z = SDNF[i] % 100 /10, w = SDNF[i] % 10;
				if (SDNF[i]) {
					if (x)
						cout << "x";
					else
						cout << "!x";
					if (y)
						cout << "y";
					else
						cout << "!y";
					if (z)
						cout << "z";
					else
						cout << "!z";
					if (w)
						cout << "w";
					else
						cout << "!w";
					if (!(x*y*z*w))
						cout << " or ";
				}
			}
			cout << "\n";
			break;
		case '3':
			for (int i = 0; i < len; i++) {
				int x = SKNF[i] / 1000, y = SKNF[i] % 1000 / 100, z = SKNF[i] % 100 / 10, w = SKNF[i] % 10;
				if (SKNF[i]) {
					if (x)
						cout << "x";
					else
						cout << "!x";
					cout << " or ";
					if (y)
						cout << "y";
					else
						cout << "!y";
					cout << " or ";
					if (z)
						cout << "z";
					else
						cout << "!z";
					cout << " or ";
					if (w)
						cout << "w";
					else
						cout << "!w";
					if (SKNF[i]==101)
						;
					else
						cout << " and ";
				}
			}
			cout << "\n";
			break;
		case '4':
		{
			Zhegalkin[0] = bul_f[0];
			Zhegalkin[4] = (bul_f[1] != Zhegalkin[0]);
			Zhegalkin[3] = (bul_f[2] != Zhegalkin[0]);
			Zhegalkin[10] = (bul_f[3] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[4]));
			Zhegalkin[2] = (bul_f[4] != Zhegalkin[0]);
			Zhegalkin[9] = (bul_f[5] != (Zhegalkin[0] ^ Zhegalkin[2] ^ Zhegalkin[4]));
			Zhegalkin[8] = (bul_f[6] != (Zhegalkin[0] ^ Zhegalkin[2] ^ Zhegalkin[3]));
			Zhegalkin[14] = (bul_f[7] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[3] ^ Zhegalkin[10] ^ Zhegalkin[2] ^ Zhegalkin[9] ^ Zhegalkin[8]));
			Zhegalkin[1] = (bul_f[8] != Zhegalkin[0]);
			Zhegalkin[7] = (bul_f[9] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[1]));
			Zhegalkin[6] = (bul_f[10] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[1]));
			Zhegalkin[13] = (bul_f[11] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[3] ^ Zhegalkin[10] ^ Zhegalkin[1] ^ Zhegalkin[7] ^ Zhegalkin[6]));
			Zhegalkin[5] = (bul_f[12] != (Zhegalkin[0] ^ Zhegalkin[1] ^ Zhegalkin[2]));
			Zhegalkin[12] = (bul_f[13] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[2] ^ Zhegalkin[9] ^ Zhegalkin[1] ^ Zhegalkin[7] ^ Zhegalkin[5]));
			Zhegalkin[11] = (bul_f[14] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[2] ^ Zhegalkin[8] ^ Zhegalkin[1] ^ Zhegalkin[6] ^ Zhegalkin[5]));
			Zhegalkin[15] = (bul_f[15] != (Zhegalkin[0] ^ Zhegalkin[1] ^ Zhegalkin[2] ^ Zhegalkin[3] ^ Zhegalkin[4] ^ Zhegalkin[5] ^ Zhegalkin[6] ^ Zhegalkin[7] ^ Zhegalkin[8] ^ Zhegalkin[9] ^ Zhegalkin[10] ^ Zhegalkin[11] ^ Zhegalkin[12] ^ Zhegalkin[13] ^ Zhegalkin[14]));
			string arr[len] = {"1","x","y","z","w","xy","xz","xw","yz","yw","zw","xyz","xyw","xzw","yzw","xyzw"};
			for (int i = 0; i < len; i++)
				if (Zhegalkin[i] != 0)
					cout << arr[i] << " ";
			cout << "\n";
			break;
		}
		case '5':
			bool flag_dop = true;
			while (flag_dop) {
				cin >> dop;
				switch (dop) {
				case '0':
					xin = 0;
					flag_dop = false;
					cin.clear();
					cin.ignore(65535, '\n');
					break;
				case '1':
					xin = 1;
					flag_dop = false;
					cin.clear();
					cin.ignore(65535, '\n');
					break;
				default:
					cout << "Wrong input \n";
					cin.clear();
					cin.ignore(65535, '\n');
					break;
				}
			}
			flag_dop = true;
			while (flag_dop) {
				cin >> dop;
				switch (dop) {
				case '0':
					yin = 0;
					flag_dop = false;
					break;
				case '1':
					yin = 1;
					flag_dop = false;
					break;
				default:
					cout << "Wrong input \n";
					break;
				}
			}
			flag_dop = true;
			while (flag_dop) {
				cin >> dop;
				switch (dop) {
				case '0':
					zin = 0;
					flag_dop = false;
					break;
				case '1':
					zin = 1;
					flag_dop = false;
					break;
				default:
					cout << "Wrong input \n";
					break;
				}
			}
			flag_dop = true;
			while (flag_dop) {
				cin >> dop;
				switch (dop) {
				case '0':
					win = 0;
					flag_dop = false;
					break;
				case '1':
					win = 1;
					flag_dop = false;
					break;
				default:
					cout << "Wrong input \n";
					break;
				}
			}
			break;
		case 'q':
			flag = false;
			break;
		default:
			cout << "Wrong input \n";
			break;
		}
	}
	return 0;
}