package wordcount;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;


class Word implements Comparable<Word>
{
	String key;
	int value;
	Word(String key, int value)
	{
		this.key=key;
		this.value=value;
	}
	@Override
	public int compareTo(Word o) {
		if(value == o.value)
			return 0;
		else if(value > o.value)
			return 1;
		else
			return -1;
	}
	
}

public class TopSomething {
	
	final static int COUNT = 10;
	public static void main(String[] args) throws FileNotFoundException
	{
		if(args.length != 2)
		{
			System.out.println("Enter correct number of locations kumar :|");
			System.exit(0);
		}
		
		
		Scanner in = new Scanner(new FileReader(args[0]));
		File file = new File(args[1]);
		PrintWriter pw = new PrintWriter(file);
		
		List<Word> data = new ArrayList<Word>();
		
		while(in.hasNext())
		{
			String[] entry = in.nextLine().split(",");
			String name = entry[0];
			int value = Integer.parseInt(entry[1]);
			Word word = new Word(name,value);
			data.add(word);
		}
		
		Collections.sort(data,Collections.reverseOrder());
		
		for(int i =0; i<COUNT; i++)
		{
			Word word = data.get(i);
			System.out.println(word.key+" "+word.value);
			pw.write(word.key+","+word.value+"\n");
		}
		pw.close();
		
		
	}

	

}
