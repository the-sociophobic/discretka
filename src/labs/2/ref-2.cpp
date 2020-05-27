#include <iostream>
#include <string>
using namespace std;

string Convert(unsigned int val, int va)
{
	string temp = "";
	unsigned int mask = 1 << (va-1);

	for (int i = 0; i < va; i++)
	{
		if ((val & mask) == 0)
			temp+="0";
		else
			temp += "1";

		mask >>= 1;
	}
	return temp;
}
void pp(unsigned const short a)
{
	for (int i = 0; i < a; i++)
    cout << " ";
}
void PrintBDR(const string t) {
	cout << endl << "Binarnoe Derevo Resheniy" << "  - Levaya = 0 , Pravaya = 1" << endl;

	pp(16 + 1); cout << "A" << endl;
	pp(13); cout << "/";
	pp(6); cout << char(92) << endl;
	pp(11+1); cout << "B";
	pp(8 + 1); cout << "B" << endl;
	pp(10); cout << "/";
	pp(1); cout << char(92);
	pp(8); cout << "/";
	pp(1); cout << char(92) << endl;
	pp(7 + 1); cout << "C";
	pp(3 + 1); cout << "C";
	pp(5 + 1); cout << "C";
	pp(3 + 1); cout << "C" << endl;
	pp(6); cout << "/";
	pp(1); cout << char(92);
	pp(2); cout << "/";
	pp(1); cout << char(92);
	pp(4); cout << "/";
	pp(1); cout << char(92);
	pp(3); cout << "/";
	pp(1); cout << char(92) << endl;
	pp(4+1); cout << "D";
	pp(1 + 1); cout << "D";
	pp(1 + 1); cout << "D";
	pp(1 + 1); cout << "D";
	pp(2 + 1); cout << "D";
	pp(1 + 1); cout << "D";
	pp(1 + 1); cout << "D";
	pp(1 + 1); cout << "D" << endl;
	pp(4 ); cout << "/";
	 cout << char(92);
	pp(1); cout << "/";
	 cout << char(92);
	pp(1); cout << "/";
	 cout << char(92);
	pp(1); cout << "/";
	 cout << char(92);
	pp(2); cout << "/";
	 cout << char(92);
	pp(1); cout << "/";
	 cout << char(92);
	pp(1); cout << "/";
	cout << char(92);
	pp(1); cout << "/";
	cout << char(92) << endl;
 pp(3); for (int i = 1; i < 17; i++) {
	 if (i%2) cout << " ";
	 if (i == 9) pp(1);
		cout << t[i-1];
	
	}
 cout << endl;
}

void FindKoef(const string t, string* koef){
	koef[0] = t[0];
	int a[2][16] = { {1,1,1,0,1,1,1,0,1,1,0,0,1,1,0,1 }, {0} };

	for (int k = 0; k < 15; k++) {
		for (int i = 0; i < 15; i++) {
			a[1][i] = (a[0][i] + a[0][i + 1]) % 2;

		}
		if (a[1][0])  *koef = *koef + "1";
		else *koef = *koef + "0";
		for (int j = 0; j < 16; j++) {
			a[0][j] = a[1][j];
		}
	}
}
string KanonG[16] = { "1 ", "+ A ","+ B ","+ C ","+ D ",
					"+ AB ","+ AC ","+ AD ",
					"+ BC ","+ BD ","+ CD ",
					"+ ABC ","+ ABD ","+ ACD ","+ BCD ","+ ABCD", };
void PrintPolynom(const string koef,string* KanonG) {
	cout << "Polynom Zhegalkina:" << endl;
	for (int i = 0; i < 16; i++) {
		if (koef[i] == '1') {
			cout << KanonG[i];
		}
	}
 }
int main()
{
	const short l = 16;
	const short va = 4;
	
	string t = "1110111011001101";
	string KoefG;
	FindKoef(t, &KoefG);
	bool SDNF[16][4];
	bool SKNF[16][4];
	
	string ti[l];
	unsigned int sdnf = 0;
	unsigned int sknf = 0;

	cout << "Isxodnaya buleva funkcia: " << t << endl << endl;
	cout << "Tablica istinnosti" << endl << endl;


	for (int i = 0; i < l; i++)
	{
		ti[i] = Convert(i, va);
		cout << ti[i] << " " << t[i] << endl;
	}
	PrintBDR(t);
	pp(8);
	for (int i = 0; i < l; i++)
	{
		if (t[i] == '1')
		{
			for (int j = 0; j < va; j++)
			{
				if (ti[i][j] == '0') {
					cout << '_';
					SDNF[sdnf][j] = false;
				}
				else {
					cout << ' ';
					SDNF[sdnf][j] = true;
				}
			}
			cout << "   ";
			sdnf++;
		}
	}
	cout << endl << "SDNF(f)=";
	if (sdnf > 0)
	{

		for (int j = 0; j < sdnf; j++)
		{
			if (j == sdnf - 1) { cout << "ABCD" << endl; }
			else { cout << "ABCD v "; }
		}
	}
	else { cout << "0"; }
	cout << endl << "Buleva funkcia(po SNDF(f))=";

	string newf;
	for (int i = 0; i < l; i++)
	{

		for (int k = 0; k < sdnf; k++)
		{
			short check = 0;
			for (int j = 0; j < va; j++)
			{
				if ((ti[i][j] == '1' && SDNF[k][j]) || (ti[i][j] == '0' && !SDNF[k][j]))
				{
					check++;
				}
			}
			if (check == va)
			{
				newf += '1';
				goto A;
			}
		}
		newf += '0';
	A:
		bool goto_mark;//doing nothing
	}
	cout << newf << endl;
	{
		pp(8);
		for (int i = 0; i < l; i++)
		{
			if (t[i] == '0')
			{
				cout << ' ' << ' ';
				for (int j = 0; j < va; j++)
				{
					if (ti[i][j] == '1') {
						cout << '_' << ' ';
						SKNF[sknf][j] = false;
					}
					else {
						cout << ' ';
						SKNF[sknf][j] = true;
					}
				}
				cout << " ";
				sknf++;
			}
		}
		cout << endl << "SKNF(f)=";
		if (sknf > 0)
		{

			for (int j = 0; j < sknf; j++)
			{
				if (j == sknf - 1) { cout << "AvBvCvD" << endl; }
				else { cout << "AvBvCvD ^ "; }
			}
		}
		else { cout << "0"; }
	}
	cout << endl << "Buleva funkcia(po SKNF(f))=";

	string newk;
	for (int i = 0; i < l; i++)
	{

		for (int k = 0; k < sknf; k++)
		{
			short check = 0;
			for (int j = 0; j < va; j++)
			{
				if ((ti[i][j] == '0' && SKNF[k][j]) || (ti[i][j] == '1' && !SKNF[k][j]))
				{
					check++;
				}
			}
			if (check == va)
			{
				newk += '0';
				goto B;
			}
		}
		newk += '1';
	B:
		bool goto_mark;//doing nothing
	}
	cout << newk << endl << "\n";
	PrintPolynom(KoefG, KanonG);

	
	string c = "0";
	while (c != "q") {
		cout << "\n\nVvedite peremennye dlya vichislenia po BDR (dlya vyxoda najmite q)\n";
		cin >> c;
		if (c == "q") {
			break;
		}
		else if (c[2] == '0') {
			cout << 1;

		}
		else if (c[0] == '0') {
			if (c[3] == '0')  cout << 1;
			else cout << 0;
		}
		
		else {
			if ((c[1] == '1') && (c[3] == '1')) cout << 1;
			else cout << 0;
				
				
		}
	
	}



	
	

	return 0;
}
















