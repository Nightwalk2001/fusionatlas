export const Background = () => {
  return <>
    <h2 className={"title"}>Background information</h2>

    <h3 className={"font-semibold"}>Gene fusion</h3>
    <div>The reasons for fusion to occur are various:</div>
    <img src={require("@/images/predict/t1-1.png").default} alt="" className={"w-3/4 mx-auto"}/>
    <div>
      A fusion gene is a hybrid gene formed from two previously independent genes. It can occur as a result of
      translocation, interstitial deletion, or chromosomal inversion. Fusion genes have been found to be prevalent in
      all
      main types of human neoplasia. The identification of these fusion genes play a prominent role in being a
      diagnostic
      and prognostic marker.
    </div>
    <img src={require("@/images/predict/t1.png").default} alt="" className={"w-3/4 mx-auto"}/>
    <div>
      Briefly,gene fusion is two broken genes join to form a gene and transcribe correspond RNA.Thus the junction of
      exons
      from two genes is detectable in RNA sequence.
    </div>

    <h3>Fusion prediction</h3>
    <div>The importance of gene fusion prediction:</div>
    <img src={require("@/images/predict/t2-1.jpeg").default} alt="" className={"w-3/4 mx-auto"}/>
    <div>
      Fusion genes is an important cause of cancer,and therefore a biomarker for cancer diagnosis. Rapid and accurate
      identification and discovery of fusion genes can not only help to study their role in cancer lesions, but also
      have
      an important impact on clinical judgment and treatment of cancer, as many fusion genes can be used as therapeutic
      targets of targeted drugs.
    </div>
    <div>Here present existing common methods for predicting gene fusion:</div>
    <img src={require("@/images/predict/t2.png").default} alt="" className={"w-3/4 mx-auto"}/>
    <div>
      With the development of transcriptome sequencing (RNA-seq) technology, gene fusion detection using transcriptome
      sequencing data has been very common,with various methods and computational tools developed. Those methods align
      the
      transcripts to reference genome, then screen out fusion genes by finding spaning reads which have parts located in
      different genes and split reads covering the junction of the two genes. In the end, filter out the false-positive
      prediction with strict standards.
    </div>

    <h3>Use of LSTM neural network</h3>
    <div>How can we use machine learning,specificly LSTM to do fusion prediction:</div>
    <div>
      A recurrent neural network (RNN) is a class of artificial neural networks where connections between nodes form a
      directed graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior. Derived from
      feedforward neural networks, RNNs can use their internal state (memory) to process variable length sequences of
      inputs.
    </div>
    <div>
      Long short-term memory (LSTM) is an artificial recurrent neural network (RNN) architecture used in the field of
      deep
      learning.
    </div>
    <div>
      The ordered exons of two genes in this problem can be easily related to RNN cells that transfer data from one cell
      to the next.Thus,we use LSTM for fusion detection and the details of our methods can be seen in the next section.
    </div>
  </>
}