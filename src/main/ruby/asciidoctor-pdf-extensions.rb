require 'asciidoctor-pdf' unless defined? ::Asciidoctor::Pdf

module AsciidoctorPdfExtensions
  def layout_title_page doc
      # no title page
  end

  def layout_chapter_title node, title
    if (node.id == "dedication" || node.id == "acknowledgements")
      # todo: Add underline of forward-slashes under title
      # todo: Add margin below title, before text
      layout_heading title, align: :center, margin_top: 3
    elsif node.id.include? "mini-book" # colophon
      # todo: make title font-size same as text, align with bottom of page
      layout_heading title, margin: 5
    elsif node.id.include? "jhipster" #chapters
      puts node.id
      # todo: add 'Part One|Two|Three' to title and make font name, size and colors match InfoQ
      layout_heading title, align: :right, margin_top: 3
      start_new_page
    else
       # delegate to default implementation
       super
    end
  end
end

Asciidoctor::Pdf::Converter.prepend AsciidoctorPdfExtensions
