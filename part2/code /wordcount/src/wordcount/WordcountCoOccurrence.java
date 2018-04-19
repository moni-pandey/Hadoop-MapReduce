package wordcount;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordcountCoOccurrence {

	public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable> {

		private final static IntWritable one = new IntWritable(1);
		private Text word = new Text();

		public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
			StringTokenizer itr = new StringTokenizer(value.toString(), " ");
			List<String> list = new ArrayList<String>();

			// create stopwordlist
			Set<String> stopWords = new LinkedHashSet<String>();
			try {
				BufferedReader SW = new BufferedReader(new FileReader("/home/moni/result/stopword.txt"));
				for (String line; (line = SW.readLine()) != null;)
					stopWords.add(line.toLowerCase().trim());
				SW.close();
			} catch (Exception e) {

			}
			

			while (itr.hasMoreTokens()) {
				String s = itr.nextToken();
				if (s.matches("[a-zA-Z]+")) {

					if (stopWords.contains(s.toLowerCase())) {

					} else {
						list.add(s.toLowerCase());
					}

				}
			} // while
			
			
			for(int i=0; i< list.size()-1;i++)
			{
				String wordd = list.get(i)+" "+list.get(i+1);
				System.out.println(wordd);
				word.set(wordd);
				context.write(word, one);
			}
			
		}
	}

	public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
		private IntWritable result = new IntWritable();

		public void reduce(Text key, Iterable<IntWritable> values, Context context)
				throws IOException, InterruptedException {
			int sum = 0;
			for (IntWritable val : values) {
				sum += val.get();
			}
			result.set(sum);
			context.write(key, result);
			
		}
	}

	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		Job job = Job.getInstance(conf, "word count");
		job.setJarByClass(WordcountCoOccurrence.class);
		job.setMapperClass(TokenizerMapper.class);
		job.setCombinerClass(IntSumReducer.class);
		job.setReducerClass(IntSumReducer.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(IntWritable.class);

		FileInputFormat.addInputPath(job, new Path(args[0]));
		FileOutputFormat.setOutputPath(job, new Path(args[1]));
		System.exit(job.waitForCompletion(true) ? 0 : 1);
	}
}
